import updateUserFunctions from './utils/updateUserFunctions/index.js'

const updateUser = (req, res) => {
    const action = req.body.action
    // ACTION (payload)

    // UPDATE_USER_DETAILS (name, bio)
    // UPDATE_USERNAME (username)
    // CHANGE_PASSWORD (password)
    // ADD_LIKE (songId)
    // REMOVE_LIKE (songId)
    // CREATE_PLAYLIST (name)
    // DELETE_PLAYLIST (playlistId)
    // ADD_SONG_TO_PLAYLIST (playlistId, songId)
    // REMOVE_SONG_FROM_PLAYLIST (playlistId, songId)
    // CHANGE_PLAYLIST_NAME (playlistId, name)

    switch(action) {
        case 'UPDATE_USER_DETAILS':
            updateUserFunctions.update_user_details(req, res)
            break

        case 'UPDATE_USERNAME':
            updateUserFunctions.update_username(req, res)
            break
            
        case 'CHANGE_PASSWORD':
            updateUserFunctions.change_password(req, res)
            break

        case 'ADD_LIKE':
            updateUserFunctions.add_like(req, res)
            break

        case 'REMOVE_LIKE':
            updateUserFunctions.remove_like(req, res)
            break

        case 'CREATE_PLAYLIST':
            updateUserFunctions.create_playlist(req, res)
            break
            
        case 'DELETE_PLAYLIST':
            updateUserFunctions.delete_playlist(req, res)
            break
            
        case 'ADD_SONG_TO_PLAYLIST':
            updateUserFunctions.add_song_to_playlist(req, res)
            break
            
        case 'REMOVE_SONG_FROM_PLAYLIST':
            updateUserFunctions.remove_song_to_playlist(req, res)
            break

        case 'CHANGE_PLAYLIST_NAME':
            updateUserFunctions.change_playlist_name(req, res)
            break

        default:
            res.status(400).send({
                "error": "BAD_DATA"
            })
    }
}

export default updateUser