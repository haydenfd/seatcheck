import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/bar",
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchPosts = async () => {
    const response = await axiosClient.get('/');
    return response.data;
  };

export const fetchChosenOfferingInfo = async () => {
    await fetch("https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/dev/url").then(res => res.json()).then((data) => {
        // console.log(data)
        return data;
    })

    return null;
}