export default async (req) => {
    try {
        console.log(req);
        if (!req || !req.query) {
            return new Response(JSON.stringify({ error: 'Invalid request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const { query } = req;
        if (!query.api_type) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiType = query.api_type;

        let apiUrl = '';
        let method = '';
        let requestBody = {};
        switch (apiType) {
            case 'register':
                // Check if required parameters for 'register' are present
                if (!query.fullname || !query.email || !query.mobile || !query.password) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for register' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Account_Registration?publickey=8xZYn5bvUfjjBVVpvK7qAsKsR&full_name=${fullname}&email=${email}&mobile=${mobile}&password=${password}`;
                method = 'POST';
                break;
            case 'login':
                // Check if required parameters for 'login' are present
                if (!query.username || !query.password) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for login' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Login_Validation?publickey=3gJbpvFUR8pR3knE8u0tMtt8p&user_name=${username}&password=${password}`;
                method = 'GET';
                break;
            case 'email_verification':
                // Check if required parameters for 'email_verification' are present
                if (!query.token) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for email verification' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Email_Verification?publickey=fArmqypVSku88tfArkejTR5wq&token=${token}`;
                method = 'GET';
                break;
            default:
                return new Response(JSON.stringify({ error: 'Invalid api_type parameter' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
        }

        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            },
            body: JSON.stringify(requestBody), // Include any request body if needed
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
