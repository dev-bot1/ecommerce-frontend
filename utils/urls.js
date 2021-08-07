export const API_URL=process.NEXT_PUBLIC_URL || 'http://localhost:1337'

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_live_31B3F4B43467AF36'

/**
* Given a image return the Url 
* Work for local and Deployed resources
* @param {any} image
*/
export const fromImageToUrl = (image) => {
    if(!image){ 
        return "/404.jpg"
    }
    if(image.url.indexOf('/')==0){
        return `${API_URL}${image.url}`
    }

    return image.url;
}