// PORT USAGE
// REACT                      -> 3000
// REST API ( main server )   -> 3002
// SOCKET ( chat map )        -> 3003
// REACT NATIVE               -> 19000

const config = {
    restapi: "http://172.20.10.3:3002",
    socket: "172.20.10.3:3003",
    date_format: { hour: 'numeric', minute: "numeric", month: 'short', day: 'numeric' },
    ipaddress: "172.20.10.3",
    web_url: "http://172.20.10.3:3000",
    colors:{
	main_color : "#ff",
    },
    default_device: {
        name: "iPhone 11",
        resolution: "1792 x 828",
        iOS: "15.4",
        beta: false,
    },

    permissions: [
        {
            type: "location",
            request: "get_current_location",
        },
        {
            type: "gallery",
            request: "get_photos",
        },
        {
            type: "gallery",
            request: "download_photo"
        },
        {
            type: "coredata",
            request: "coredata_edit"
        },
        {
            type: "coredata",
            request: "coredate_get"
        }
    ],

    widows: {
        restapi: "http://192.168.1.18:3002",
        ipaddress: "192.168.1.18:3002"
    },

    macos: {
        restapi: "http://172.20.10.3:3002",
        ipaddress: "172.20.10.3",
    }
}


export default config
