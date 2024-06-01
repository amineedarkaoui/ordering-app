export const navItems = [
    {text:"overview", icon:"ri:dashboard-line", path:"/dashboard/overview"},
    {text:"sales analysis", icon:"solar:dollar-outline", path:"/dashboard/sales-analysis"},
    {text:"menu analysis", icon:"ep:data-analysis", path:"/dashboard/menu-analysis"},
    {text:"manage menu", icon:"mdi:food-outline", path:"/dashboard/manage-menu"},
]

export const mainPageItems = [
    {name:"dashboard", icon:"fa6-solid:chart-line", path:navItems[0].path},
    {name:"order", icon:"material-symbols:restaurant", path:"/categories"},
]
export const dashboardHeaderItems = [
    {name:"home", icon:"ri:home-line", fill:"", path:"/"},
]

export const navHeaderItems = [
    {name:"dashboard", icon:"lucide:line-chart", fill:"none", path:navItems[0].path},
    {name:"orders", icon:"mdi:cart-outline", fill:"mdi:cart", path:"none"},
]

