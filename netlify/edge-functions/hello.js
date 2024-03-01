export default async (req) => {
    try {
        const { query } = req;
        if (!query || !query.params) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const { updates, cloneFrom, encoder, map } = query.params;
        if (!updates || !Array.isArray(updates)) {
            return new Response(JSON.stringify({ error: 'Invalid updates parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const queryParams = updates.reduce((acc, { param, value }) => {
            acc[param] = value;
            return acc;
        }, {});
        /*
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        console.log(queryParams);
        if (!queryParams) {
            return new Response(JSON.stringify({ error: 'Invalid request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        console.log(queryParams);
        const { query } = req;
        console.log(query);
        if (!queryParams.has('api_type')) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        */
       const apiType = queryParams.api_type;
        let apiUrl = '';
        let method = '';
        let requestBody = {};
        switch (apiType) {
            case 'register':
                if (!queryParams.fullname || !queryParams.email || !queryParams.mobile || !queryParams.password) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for register' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Account_Registration?publickey=8xZYn5bvUfjjBVVpvK7qAsKsR&full_name=${queryParams.fullname}&email=${queryParams.email}&mobile=${queryParams.mobile}&password=${queryParams.password}`;
                method = 'GET';
                break;
            case 'login':
                if (!queryParams.username || !queryParams.password) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for login' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Login_Validation?publickey=3gJbpvFUR8pR3knE8u0tMtt8p&user_name=${queryParams.username}&password=${queryParams.password}`;
                method = 'GET';
                break;
            case 'email_verification':
                if (!queryParams.token) {
                    return new Response(JSON.stringify({ error: 'Missing required parameters for email verification' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                apiUrl = `https://www.zohoapis.com/creator/custom/vanavihari/Email_Verification?publickey=fArmqypVSku88tfArkejTR5wq&token=${queryParams.token}`;
                method = 'GET';
                break;
            default:
                return new Response(JSON.stringify({ error: 'Invalid api_type parameter' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        // console.log(apiUrl);
        // console.log(method);
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                // 'Access-Control-Allow-Origin': 'https://www.zohoapis.com',
            },
            // body: JSON.stringify(requestBody), // Include any request body if needed
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
