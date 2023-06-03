import { Component, Fragment, createRef } from 'react';
import { Props, State } from './VideoUpload.types';
import './video-upload.css';
import { PlusLg } from 'react-bootstrap-icons';
import axiosInt from '@config/axios';

class VideoUpload extends Component<Props, State>
{
    refVideoUploadContainer: any;
    url: string | null;

    constructor(props: any)
    {
        super(props);
        this.state = {
            previewVideo: null
        };
        this.refVideoUploadContainer = createRef();
        this.url = null;
    }

    handleVideoChange = (event) =>{
        const videoUploadContainer = this.refVideoUploadContainer.current;
        videoUploadContainer.classList.add('video-selected');

        const reader = new FileReader();
        const file = event.target.files[0];
        
        if(file){
            reader.readAsDataURL(file);
        }
        
        reader.onload = () => {
            if(file.type.includes("video")){
                this.setState({
                    previewVideo: reader.result,
                });
            }
        };

        const formData = new FormData();
        formData.append('file', file);

        if (this.url){
            axiosInt.post('dev-modulo-capacitaciones/api/capacitaciones/delete_file/', {
                url: this.url,
            }).then(response => {
                console.log(response.data);
            })
        }

        axiosInt.post('dev-modulo-capacitaciones/api/capacitaciones/upload_file/', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }).then(response => {
            this.url = response.data.url;
        }).catch(error => {
            console.error(error);
        });
    };

    getUrl (){
        return this.url;
    }

    render () {
        return (
            <Fragment>
                <div ref={this.refVideoUploadContainer}>
                    <input id="videoUploadInput" type="file" accept='video/*' hidden onChange={this.handleVideoChange} />
                    <label className='video-input-label' htmlFor="videoUploadInput">
                        <PlusLg className='video-input-label-icon'/>
                        <small>Video</small>
                    </label>
                    {this.state.previewVideo && (
                        <video className='video-input-preview' controls src={this.state.previewVideo} preload='metadata'/>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default VideoUpload;
