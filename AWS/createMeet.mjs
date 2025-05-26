// import packageJson from '@aws-sdk/client-s3/package.json' with { type: 'json' };
// export const handler = async () => ({ version: packageJson.version });
// console.log('AWS SDK version:', packageJson.version);
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';


const harry = async () => {
    // const data = await fetch('https://potterapi-fedeperin.vercel.app/en/books?index=1', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // })
    
    // if (!data.ok) {
    //     throw new Error('Network response was not ok');
    // }
    // return await data.json();
    return {
        number: 2,
        title: 'Harry Potter and the Chamber of Secrets',
        originalTitle: 'Harry Potter and the Chamber of Secrets',
        releaseDate: 'Jul 2, 1998',
        description: 'Harry Potter and the sophomores investigate a malevolent threat to their Hogwarts classmates, a menacing beast that hides within the castle.',
        pages: 251,
        cover: 'https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/2.png',
        index: 1
      }
    // console.log(json);
}

const data = await harry();
console.log(data);

const client = new TranslateClient({ region: 'us-east-1' });

const command = new TranslateTextCommand({
    Text: data.title,
    SourceLanguageCode: 'en',
    TargetLanguageCode: 'es'
});

const result = await client.send(command);
console.log(result.TranslatedText);


// (async () => {
//     console.log('AWS SDK version:', packageJson.version);

//     // const data = await fetch('https://potterapi-fedeperin.vercel.app/en/books?index=1', {
//     //     method: 'GET',
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //         'Accept': 'application/json'
//     //     }
//     // })

//     // if (!data.ok) {
//     //     throw new Error('Network response was not ok');
//     // }
//     // const json = await data.json();
//     // console.log(json);
// })()


// import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

// export const handler = async (event) => {
//   let book = {};
//   try {
//       const data = await fetch('https://potterapi-fedeperin.vercel.app/en/books?index=1', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//       });
      
//       if (!data.ok) {
//         return {
//           statusCode: 500,
//           body: JSON.stringify({ message: 'Error to fecth the data', event: JSON.stringify(event)}),
//         };
//       }

//       book = await data.json();
//   } 
//   catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error to fecth the data', event: JSON.stringify(event)}),
//     };
//   }
  
//   try {
//       const client = new TranslateClient({ region: 'us-east-1' });
    
//       const command = new TranslateTextCommand({
//           Text: book?.title,
//           SourceLanguageCode: 'en',
//           TargetLanguageCode: 'es'
//       });
    
//       const result = await client.send(command);
//       console.log(result?.TranslatedText);
    
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ message: result?.TranslatedTex }),
//       };
//   } 
//   catch (error) {
//     console.error('Error to traslate the data:::', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error to traslate the data', error: JSON.stringify(error)}),
//     };
//   }
// };


//// 
// ONLY THE TRANSLATOR!!!!

// export const handler = async (event) => {  
//   try {
//       const { lang } = event.queryStringParameters;
//       const client = new TranslateClient({ region: 'us-east-1' });
//       const targetLang = lang || process.env.LANG;

//       const command = new TranslateTextCommand({
//           Text: 'Harry Potter and the Chamber of Secrets',
//           SourceLanguageCode: 'en',
//           TargetLanguageCode: targetLang 
//       });
    
//       const result = await client.send(command);
    
//       return {
//         statusCode: 200,
//         body: JSON.stringify({message: result?.TranslatedText})
//       };
//   } 
//   catch (error) {
//     console.error('Error to traslate the data:::', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error to traslate the data', error: JSON.stringify(error)}),
//     };
//   }
// };

