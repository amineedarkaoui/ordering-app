import image1 from "../images/image1.png"
import image2 from "../images/image2.jpeg"
import image3 from "../images/image3.jpg"

export const mainPageItems = [
    {name:"dashboard", icon:"fa6-solid:chart-line", path:"/"},
    {name:"order", icon:"material-symbols:restaurant", path:"/categories"},
]

export const navHeaderItems = [
    {name:"dashboard", icon:"lucide:line-chart", fill:"none", path:"/"},
    {name:"orders", icon:"mdi:cart-outline", fill:"mdi:cart", path:"none"},
]

export const tempItems = [
    {name:"item 1", price:13, image:image1},
    {name:"item 2", price:34, image:image2},
    {name:"item 3", price:13, image:image3},
    {name:"item 4", price:22, image:image1},
    {name:"item 5", price:5, image:image2},
    {name:"item 6", price:5, image:image3},
    {name:"item 7", price:13, image:image1},
    {name:"item 8", price:78, image:image2},
    {name:"item 9", price:13, image:image3},
]