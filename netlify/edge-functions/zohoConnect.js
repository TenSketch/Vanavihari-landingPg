export default async (req) => {
  const zoho_api_uri = "https://www.zohoapis.com/creator/custom/vanavihari/";
  try {
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    if (!queryParams) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const { query } = req;
    if (!queryParams.has("api_type")) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const apiType = queryParams.get("api_type");

    let apiUrl = "";
    let method = "";
    let requestBody = {};
    let perm = '';
    switch (apiType) {
      case "register":
        if (
          !queryParams.has("fullname") ||
          !queryParams.has("email") ||
          !queryParams.has("mobile") ||
          !queryParams.has("password")
        ) {
          return new Response(
            JSON.stringify({
              error: "Missing required parameters for register",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        apiUrl = `${zoho_api_uri}Account_Registration?publickey=kFs7xRDC5eRPfyCQ0W7yQNCRv&full_name=${queryParams.get("fullname")}&email=${queryParams.get("email")}&phone=${queryParams.get("mobile")}&password=${queryParams.get("password")}`;
        method = "GET";
        break;
      case "login":
        if (!queryParams.has("username") || !queryParams.has("password")) {
          return new Response(
            JSON.stringify({ error: "Missing required parameters for login" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        apiUrl = `${zoho_api_uri}Login_Validation?publickey=PWu6q9GvYJJjNSnM6UFSU6fSx&username=${queryParams.get("username")}&password=${queryParams.get("password")}`;
        method = "GET";
        break;
      case "email_verification":
        if (!queryParams.has("token") || !queryParams.has("userid")) {
          return new Response(
            JSON.stringify({
              error: "Missing required parameters for email verification",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        apiUrl = `${zoho_api_uri}Email_Verification?publickey=TJNXwBQpaFWVvUK3ZmKvufVOJ&guest_id=${queryParams.get("userid")}&token=${queryParams.get("token")}`;
        method = "GET";
        break;
      case "room_list":
        // if () {
        //     return new Response(JSON.stringify({ error: 'Missing required parameters for email verification' }), {
        //         status: 400,
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // }
       
        if(queryParams.has("resort")) perm += `&resort=${queryParams.get("resort")}`;
        if(queryParams.has("checkin")) perm += `&checkin=${queryParams.get("checkin")}`;
        if(queryParams.has("checkout")) perm += `&checkout=${queryParams.get("checkout")}`;
        apiUrl = `${zoho_api_uri}Rooms_List?publickey=J4s0fXQ0wuxFDJJ2ns9Gs3GqK`;
        method = "GET";
        break;
      case "profile_details":
        if (!queryParams.has("token") || !queryParams.has("email")) {
            return new Response(JSON.stringify({ error: 'Missing required parameters for email verification' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        apiUrl = `${zoho_api_uri}Profile_Details?publickey=7AwGYAgpPRaOUDEzbqYpeFyvs&email=${queryParams.get("email")}&token=${queryParams.get("token")}`;
        method = "GET";
        break;
      case "edit_profile_details":
        if (!queryParams.has("token") || !queryParams.has("email")) {
            return new Response(JSON.stringify({ error: 'Missing required parameters for email verification' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if(queryParams.has("dob")) perm += `&dob=${queryParams.get("dob")}`;
        if(queryParams.has("nationality")) perm += `&nationality=${queryParams.get("nationality")}`;
        if(queryParams.has("address1")) perm += `&address1=${queryParams.get("address1")}`;
        if(queryParams.has("address2")) perm += `&address2=${queryParams.get("address2")}`;
        if(queryParams.has("city")) perm += `&city=${queryParams.get("city")}`;
        if(queryParams.has("state")) perm += `&state=${queryParams.get("state")}`;
        if(queryParams.has("pincode")) perm += `&pincode=${queryParams.get("pincode")}`;
        if(queryParams.has("country")) perm += `&country=${queryParams.get("country")}`;
        apiUrl = `${zoho_api_uri}Edit_Profile?publickey=AKSTTeZV7TEPW4xd2JwaVOuYn&login_email=${queryParams.get("email")}&token=${queryParams.get("token")}${perm}`;
        method = "GET";
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid api_type parameter" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
    }
    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Origin': 'https://www.zohoapis.com',
      },
      // body: JSON.stringify(requestBody), // Include any request body if needed
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/zoho-connect",
};
