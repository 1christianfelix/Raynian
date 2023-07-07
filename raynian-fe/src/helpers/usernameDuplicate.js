  // check for username Duplicates and username invalidation throwing
export const checkUsernameDuplicate = async (user) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user }),
    };

    const res = await fetch(
      "http://localhost:4000/api/user/check/username",
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      if (data.valid_display) {
        return data;
      }
    }
  };
