import axiosClient from './axiosClient'

export const typeVideo = {
    forYou: 'for-you',
    following: 'following',
}

const Api = {
    getSearchUsers: (params) => {
        const url = 'users/search'
        return axiosClient.get(url, params)
    },

    getSuggestedchUsers: (params) => {
        const url = 'users/suggested'
        return axiosClient.get(url, params)
    },

    getFollowingsList: (params) => {
        const url = 'me/followings'
        return axiosClient.get(url, params)
    },

    getVideosList: (params) => {
        const url = 'videos'
        return axiosClient.get(url, params)
    },
}

export default Api
