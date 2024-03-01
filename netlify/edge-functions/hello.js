export default async (req) => {
    const { query } = req;
    if (!query.api_type) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const apiType = query.api_type;
    const fullname = query.fullname;
    const username = query.username;
    const email = query.email;
    const mobile = query.mobile;
    const password = query.password;
    const token = query.token;

    let apiUrl = '';
    let method = '';

    try {
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
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const config = {
    path: "/zoho-connect"
}
