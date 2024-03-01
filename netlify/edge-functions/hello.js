import fetch from 'node-fetch';

export default async (req) => {
    try {
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

        switch (apiType) {
            case 'registration':
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Account_Registration?publickey=8xZYn5bvUfjjBVVpvK7qAsKsR&full_name=${fullname}&email=${email}&mobile=${mobile}&password=${password}`;
                method = 'GET';
                break;
            case 'login':
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Login_Validation?publickey=${publickey}&user_name=${username}&password=${password}`;
                method = 'GET';
                break;
            case 'email_verification':
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Email_Verification?publickey=fArmqypVSku88tfArkejTR5wq&token=${token}`;
                method = 'GET';
                break;
            default:
                return new Response(JSON.stringify({ error: 'Invalid API parameter' }), {
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
            // If sending data in the request body for POST requests
            // body: JSON.stringify({ key: 'value' }),
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
};

export const config = {
    path: "/zoho-connect"
};
