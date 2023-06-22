import { Component, Fragment, createRef } from 'react';
import { Props, State } from './FileZipUpload.types';
import './file-zip-upload.css';
import { FileEarmarkZip, PlusLg } from 'react-bootstrap-icons';
import axiosInt from '@config/axios';

class FileZipUpload extends Component<Props, State>
{
    refFileZipUploadContainer: any;
    url: string | null;

    constructor(props: any)
    {
        super(props);
        this.state = {
            fileName: null,
            fileURL: null
        };
        this.refFileZipUploadContainer = createRef();
        this.url = null;
    }

    handleFileZipChange = (event) => {
        const fileZipUploadContainer = this.refFileZipUploadContainer.current;
        fileZipUploadContainer.classList.add('file-selected');
        
        const file = event.target.files[0];
        
        if(file){
            this.setState({
                fileName: file.name,
                fileURL: URL.createObjectURL(file)
            });
        }

        const formData = new FormData();
        formData.append('file', file);

        if (this.url){
            axiosInt.post('capacitaciones/delete_file/', {
                url: this.url,
            }).then(response => {
                console.log(response.data);
            })
        }

        axiosInt.post('capacitaciones/upload_file/', formData, {
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

    handleDownload = (event) =>{
        if (this.state.fileURL) {
            const link = document.createElement('a');
            link.href = this.state.fileURL;
            link.download = this.state.fileName;
            link.click();
        }
    };

    render () {
        return (
            <Fragment>
                <div ref={this.refFileZipUploadContainer}>
                    <input id="fileZipUploadInput" type="file" accept='zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed' hidden onChange={this.handleFileZipChange} />
                    <label className='file-input-label' htmlFor="fileZipUploadInput">
                        <PlusLg className='file-input-label-icon'/>
                        <small>Archivo .zip</small>
                    </label>
                    {this.state.fileName && (
                        <div className='row mt-3'>
                            <div className='col'>
                                <button className="btn btn-outline-secondary" onClick={this.handleDownload}><FileEarmarkZip/><span style={{marginLeft: "1rem"}}>{this.state.fileName}</span></button>
                            </div>
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default FileZipUpload;
