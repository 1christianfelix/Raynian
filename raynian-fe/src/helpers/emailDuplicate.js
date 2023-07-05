export const checkEmailDuplicate = async (email) => {

    console.log('inside')
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };

    const res = await fetch(
      "http://localhost:4000/api/user/check/email",
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

};
