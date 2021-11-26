import { supabase } from '../../app/db'
import { getLogger } from '../../app/utils'
let { info, fail, warn } = getLogger('images', 'info')
export async function fetchImage(name) {
    const img = sessionStorage.getItem(name)
    if (!img) {
        info('fetching image', name)
        const { data: blob, error } = await supabase.storage
            .from('public/public/mental-images')
            .download(name)

        if (error) {
            fail('error', error)
            return Promise.reject('error', error)
        } else {

            return new Promise(function (resolve, reject) {
                let reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    try {
                    sessionStorage.setItem(name, reader.result)
                    }
                    catch(error) {
                        warn('error',error)
                    }
                    info('image loaded', name)
                    return resolve(reader.result)
                }
                reader.onerror = (error) => reject('Error: ', error)
            })
        }
    } else {
        return Promise.resolve(img)
    }
}