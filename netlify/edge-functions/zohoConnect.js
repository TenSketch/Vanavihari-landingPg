export default async (req) => {
    const response = await fetch('https://www.zohoapis.com/creator/custom/vanavihari/Login_Validation?publickey=3gJbpvFUR8pR3knE8u0tMtt8p&user_name=venkat408prabhu@gmail.com&password=123456', {
        method: 'GET', // or 'POST'
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Origin': 'http://example.com',  // Use this line to allow specific domain
        },
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export const config = {
    path: "/zoho-connect"
}
