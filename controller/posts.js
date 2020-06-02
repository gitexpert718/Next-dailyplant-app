import axios from "axios";

async function getFeaturedPost(categorySlug) {
    const url = categorySlug ? 
    `http://dcoders.rs:1337/posts?isLink=false&_limit=1&_sort=views:DESC&categories.slug=${categorySlug}` : 
    "http://dcoders.rs:1337/posts?isLink=false&_limit=1&_sort=views:DESC";
    const response = await axios.get(url);
    return response.data;
}

async function getTopFive(categorySlug) {
    const url = categorySlug ? 
    `http://dcoders.rs:1337/posts?_limit=5&_sort=views:DESC&categories.slug=${categorySlug}` : 
    "http://dcoders.rs:1337/posts?_limit=5&_sort=views:DESC";
    const response = await axios.get(url);
    return response.data;
}

async function latestPosts(categorySlug, sort, page) {
    let start = (page-1)*10;
    let limit = 10;
    let url = `http://dcoders.rs:1337/posts?_start=${start}&&_limit=${limit}`;
    if(categorySlug) {
        url += `&&categories.slug=${categorySlug}`
    }
    if(sort == "top") {
        url += `&&_sort=views:DESC`
    } else {
        url += `&&_sort=createdAt:DESC`
    }
    
    const response = await axios.get(url);
    return response.data;
}

async function getSinglePost(postSlug) {
    const url = `http://dcoders.rs:1337/posts?slug=${postSlug}`;
    const response = await axios.get(url);
    const post = await axios.get(`http://dcoders.rs:1337/posts/${response.data[0]._id}`)
    return post.data;
}

export default {
    getFeaturedPost,
    getTopFive,
    latestPosts,
    getSinglePost
}