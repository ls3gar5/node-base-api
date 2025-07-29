const API_URL = "https://api.example.com";
class FetchInfo {
    constructor(public endpoint: string) { }

    fetchData = async (endpoint: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }

    }
}

export const fetchInfo = new FetchInfo(API_URL);