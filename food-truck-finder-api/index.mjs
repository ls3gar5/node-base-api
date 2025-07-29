import https from 'https';
import { URL } from 'url';
/**
 * AWS Lambda handler for food truck location service
 * 
 * Expected query parameters:
 * - lat: latitude (required)
 * - lon: longitude (required) 
 * - radius: search radius in miles (optional, default: 1)
 * - limit: max number of results (optional, default: 20)
 */
const handler = async (event, context) => {
    try {
        // Parse query parameters
        const queryParams = event.queryStringParameters || {};
        
        // Validate required parameters
        if (!queryParams.lat || !queryParams.lon) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Missing required parameters: lat and lon'
                })
            };
        }
        
        let userLat, userLon, radius, limit;
        
        try {
            userLat = parseFloat(queryParams.lat);
            userLon = parseFloat(queryParams.lon);
            radius = parseFloat(queryParams.radius || '1.0'); // Default 1 mile
            limit = parseInt(queryParams.limit || '20');
            
            if (isNaN(userLat) || isNaN(userLon) || isNaN(radius) || isNaN(limit)) {
                throw new Error('Invalid number format');
            }
        } catch (error) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Invalid parameter format. lat, lon, and radius must be numbers'
                })
            };
        }
        
        // Get food truck data from SF Open Data API
        const sfDataUrl = new URL('https://data.sfgov.org/resource/jjew-r69b.json');
        sfDataUrl.searchParams.append('$limit', '5000');
        sfDataUrl.searchParams.append('$where', 'latitude IS NOT NULL AND longitude IS NOT NULL');
        
        const foodTrucksData = await fetchData(sfDataUrl.toString());
        
        // Filter food trucks within radius
        const nearbyTrucks = [];
        
        for (const truck of foodTrucksData) {
            if (!truck.latitude || !truck.longitude) {
                continue;
            }
            
            try {
                const truckLat = parseFloat(truck.latitude);
                const truckLon = parseFloat(truck.longitude);
                
                if (isNaN(truckLat) || isNaN(truckLon)) {
                    continue;
                }
                
                // Calculate distance using Haversine formula
                const distance = haversineDistance(userLat, userLon, truckLat, truckLon);
                
                if (distance <= radius) {
                    const truckInfo = {
                        locationdesc: truck.locationdesc || '',
                        address: truck.location || '',
                        food_items: truck.optionaltext || '',
                        latitude: truckLat,
                        longitude: truckLon,
                        distance_miles: Math.round(distance * 100) / 100,
                        starttime: truck.starttime || '',
                        endtime: truck.endtime || ''
                    };
                    nearbyTrucks.push(truckInfo);
                }
            } catch (error) {
                continue;
            }
        }
        
        // Sort by distance and limit results
        nearbyTrucks.sort((a, b) => a.distance_miles - b.distance_miles);
        const limitedTrucks = nearbyTrucks.slice(0, limit);
        console.log(`Found ${limitedTrucks.length} of ${foodTrucksData.length} food trucks within ${radius} miles of (${userLat}, ${userLon})`);
        // console.log({
        //         location: {
        //             latitude: userLat,
        //             longitude: userLon,
        //             search_radius_miles: radius
        //         },
        //         total_found: limitedTrucks.length,
        //         food_trucks: limitedTrucks
        //     });
        // Prepare response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                location: {
                    latitude: userLat,
                    longitude: userLon,
                    search_radius_miles: radius
                },
                total_found: limitedTrucks.length,
                food_trucks: limitedTrucks
            })
        };
        
    } catch (error) {
        console.error('Error processing request:', error);
        
        if (error.message && error.message.includes('fetch')) {
            return {
                statusCode: 502,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Failed to fetch food truck data',
                    details: error.message
                })
            };
        }
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                details: error.message
            })
        };
    }
};

/**
 * Fetch data from URL using https module
 * @param {string} url - URL to fetch data from
 * @returns {Promise<Array>} - Parsed JSON response
 */
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            let data = '';
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        });
        
        request.on('error', (error) => {
            reject(new Error(`Failed to fetch data: ${error.message}`));
        });
        
        request.setTimeout(25000, () => {
            request.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

/**
 * Calculate the great circle distance between two points 
 * on the earth (specified in decimal degrees)
 * Returns distance in miles
 * 
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} - Distance in miles
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    // Convert decimal degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    
    // Haversine formula
    const dlat = lat2Rad - lat1Rad;
    const dlon = lon2Rad - lon1Rad;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
    
    // Radius of earth in miles
    const r = 3956;
    
    return c * r;
}


handler({    queryStringParameters: {
        lat: '37.792846595133213',
        lon: '-122.402366496939052',
    }});