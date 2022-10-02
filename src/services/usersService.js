import Api from '~/Api/Api'

export const getSuggested = async (page, perPage) => {
    try {
        const res = await Api.getSuggestedchUsers({
            params: {
                page,
                per_page: perPage,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getFollowingsList = async (page) => {
    try {
        const res = await Api.getFollowingsList({
            params: {
                page,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (nickname) => {
    try {
        const res = await Api.getAnUser(nickname)
        return res.data
    } catch (error) {
        console.log(error)
    }
}



