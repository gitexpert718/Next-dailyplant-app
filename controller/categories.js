import axios from "axios";

async function getCategories() {
    const categories = await axios.get("http://dcoders.rs:1337/categories");
    return categories.data
}

export default {
    getCategories
}