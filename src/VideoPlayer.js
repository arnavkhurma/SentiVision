import { react } from 'react'
import './VideoPlayer.css'

const VideoPlayer = props => {
    return (
        <div
            className= 'videomask shadow-none p-3 mb-5 bg-transparant '
            style= {{
                marginLeft: '30px',
                borderRadius: '20px',
                borderBlockColor: 'black',
                overflow: 'hidden',
                position: 'static'
            }}
        >
            <video width='650' height='350' controls autoPlay muted>
                <source src='' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <br />
        </div>
    )
}

export default VideoPlayer