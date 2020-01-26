class EasyHTTP {

   async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }
}

export const http = new EasyHTTP();