import React, { Component, Fragment, createRef } from 'react';
import { Form } from 'react-bootstrap';
import { Props, State } from './PictureUpload.types';
import './picture-upload.css';

class PictureUpload extends Component<Props, State>
{
  refPictureUploadContainer: any;
  constructor(props: any)
  {
    super(props);
    this.state = {
      previewImage: null,
    };
    this.refPictureUploadContainer = createRef();
  }

  handlePictureChange = (event) =>
  {
    const pictureUploadContainer = this.refPictureUploadContainer.current;
    pictureUploadContainer.classList.add('picture-selected');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () =>
    {
      this.setState({
        previewImage: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  render ()
  {
    return (
      <Fragment>
        <div ref={this.refPictureUploadContainer}>
          <input id="pictureUploadInput" type="file" hidden onChange={this.handlePictureChange} />
          <label className='picture-input-label' htmlFor="pictureUploadInput">
            <svg className='picture-input-label-icon bi bi-plus-lg' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg>
            <small>Foto</small>
          </label>
          {this.state.previewImage && (
            <img className='picture-input-preview' src={this.state.previewImage} alt="Preview" />
          )}
        </div>
      </Fragment>
    );
  }
}

export default PictureUpload;
