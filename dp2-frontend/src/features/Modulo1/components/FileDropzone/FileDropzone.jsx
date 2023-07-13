import React, { Component } from 'react';
import { Card, Badge, Alert } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axiosInt from '../../../../config/axios';
import FileUploadService from '../../utils/FileUploadService';
import './file-dropzone.css';

export default class FileDropzone extends Component
{
    constructor (props)
    {
        super(props);
        this.upload = this.upload.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.state = {
            prevFiles: [],
            selectedFiles: [],
            currentFile: undefined,
            uploaded: [],
            progress: [],
            files: [],
            ignoredFiles: [],
            errorMaxFiles: false,
            errorMaxSize: false,
        };
    }

    static defaultProps = {
        maxSize: 10,
        maxFiles: 5,
        disabled: false,
        showBadge: true,
    }

    componentDidMount ()
    {
        this.props.prevFiles && this.setState({
            prevFiles: this.props.prevFiles,
        })
        this.props.canSend && this.props.canSend(!this.props.required);
    }

    componentDidUpdate (prevProps)
    {
        if (prevProps.prevFiles !== this.props.prevFiles)
        {
            this.setState({
                prevFiles: this.props.prevFiles
            });
        }
    }

    upload (currentFile, i)
    {
        this.props.canSend && this.props.canSend(false);
        let prog = this.state.progress;
        prog[i] = 0;
        this.setState({
            progress: prog,
            currentFile: currentFile,
        }, async () =>
        {
            await FileUploadService.upload(currentFile, (event) =>
            {
                let prog = this.state.progress;
                prog[i] = Math.round((100 * event.loaded) / event.total);
                this.setState({
                    progress: prog,
                });
            })
                .then((response) =>
                {
                    let f = this.state.files;
                    f[i] = response.data.url;
                    this.setState({
                        files: f,
                        currentFile: undefined
                    }, this.props.canSend && this.props.canSend(this.state.uploaded.length > 0 || !this.props.required))
                })
                .catch(() =>
                {
                    let prog = this.state.progress;
                    prog[i] = -1;
                    this.setState({
                        progress: prog,
                        currentFile: undefined,
                    }, this.props.canSend && this.props.canSend(this.state.uploaded.length > 0 || !this.props.required));
                });
            let upfil = this.state.uploaded;
            upfil[i] = 1;
            this.setState({
                uploaded: upfil,
            });
        });
    }

    getFiles ()
    {
        return !this.state.currentFile ? [...this.state.prevFiles, ...this.state.files] : null;
    }

    canGet ()
    {
        return this.state.currentFile === undefined;
    }

    uploadFiles ()
    {
        this.state.selectedFiles.forEach(async (file, i) =>
        {
            if (!this.state.uploaded[i])
            {
                await this.upload(file, i);
            }
        })
    }

    async onDrop (files, fileRejections)
    {
        if (files.length > 0)
        {
            if (this.state.selectedFiles.length + files.length > this.props.maxFiles)
            {
                this.setState({
                    errorMaxFiles: true,
                })
                return;
            }
            this.setState({
                errorMaxFiles: false,
            })
            let zarr = new Array(files.length + 1).join('0').split('').map(parseInt);
            this.setState({
                selectedFiles: [...this.state.selectedFiles, ...files],
                progress: [...this.state.progress, ...zarr],
                uploaded: [...this.state.uploaded, ...zarr],
                files: [...this.state.files, ...zarr]
            }, this.uploadFiles)
                ;
        }
        if (fileRejections.length > 0)
        {
            this.setState({
                ignoredFiles: fileRejections,
            })
        }
    }

    getUrl (event)
    {
        return this.state.fileInfos;
    }

    getFileIcon (file)
    {
        switch (file.type)
        {
            case "application/pdf":
                return "bi-filetype-pdf";
            case "image/svg+xml":
                return "bi-filetype-svg";
            case "text/csv":
                return "bi-filetype-csv";
            case "application/msword":
                return "bi-file-earmark-text";
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "bi-file-earmark-text";
            case "application/vnd.ms-excel":
                return "bi-file-earmark-ruled";
            case "	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "bi-file-earmark-ruled";
            case "application/vnd.ms-powerpoint":
                return "bi-file-earmark-slides";
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "bi-file-earmark-slides";
            case "application/zip":
                return "bi-file-earmark-zip";
            case "image/tiff":
                return "bi-image";
            case "image/bmp":
                return "bi-image";
            case "image/jpeg":
                return "bi-image";
            case "image/gif":
                return "bi-image";
            case "image/png":
                return "bi-image";
            default:
                return "bi-file-earmark";
        }
    }

    deleteFile (event)
    {
        event.stopPropagation();
        let sFiles = this.state.selectedFiles;
        let prog = this.state.progress;
        let files = this.state.files;
        let upl = this.state.uploaded;
        if (event.target.dataset.file > -1)
        {
            this.deleteFileFromServer(files[event.target.dataset.file]);
            sFiles.splice(event.target.dataset.file, 1);
            prog.splice(event.target.dataset.file, 1);
            files.splice(event.target.dataset.file, 1);
            upl.splice(event.target.dataset.file, 1);
            this.setState({
                selectedFiles: sFiles,
                progress: prog,
                files: files,
                uploaded: upl,
            });
        }
        this.props.canSend && this.props.canSend(this.state.uploaded.length > 0 || !this.props.required);
    }

    deletePrevFile (event)
    {
        event.stopPropagation();
        let pFiles = this.state.prevFiles;
        if (event.target.dataset.file > -1)
        {
            this.deleteFileFromServer(pFiles[event.target.dataset.file]);
            pFiles.splice(event.target.dataset.file, 1);
            this.setState({
                prevFiles: pFiles,
            }, () => { console.log(this.prevFiles) });
        }
    }

    deleteFileFromServer (file_url)
    {
        console.log(file_url);
        axiosInt.post('capacitaciones/delete_file/', {
            url: file_url
        })
            .then(
                (response) =>
                {
                    console.log(response.msg);
                }
            )
            .catch((err) =>
            {
                if (err.code === "ERR_BAD_RESPONSE")
                {
                    console.log("Error interno del servidor");
                    return;
                }
                let errMsg;
                (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.status === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.msg)
                console.log(errMsg);
            });
    }

    render ()
    {
        const { prevFiles, selectedFiles, progress } =
            this.state;

        return (
            <div className="mt-0 px-0">
                <Alert hidden={!this.state.errorMaxFiles} variant="danger">
                    El límite son {this.props.maxFiles} archivos.
                </Alert>
                {
                    this.props.showBadge && <div style={{ textAlign: 'right' }}>
                        <Badge pill bg="secondary" className='mb-3'>
                            Máximo {this.props.maxFiles} archivos de {this.props.maxSize} MB cada uno
                        </Badge>
                    </div>
                }
                <Dropzone accept={this.props.accept} disabled={this.props.disabled} onDrop={this.onDrop} multiple={true} noClick={false} maxSize={this.props.maxSize * 1048576}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: ` dropzone ${this.props.disabled ? 'dropzone-disabled' : ''} ` })} >
                                <input {...getInputProps()} />
                                {prevFiles.length !== 0 && (
                                    <div className="selected-file">
                                        {prevFiles.length && prevFiles.map((file, i) =>
                                        {
                                            return (
                                                <Card className="dropzone-file-card" key={i} onClick={(e) => (e.stopPropagation())} >
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {
                                                                !this.props.disabled && <div className='dropzone-file-remove'><i onClick={this.deletePrevFile.bind(this)} data-file={i} className="bi bi-x-circle-fill"></i></div>
                                                            }
                                                            <i className={"dropzone-file-icon bi bi-file-earmark"} />
                                                        </Card.Title>
                                                        <Card.Subtitle className="dropzone-file-name mb-2 text-muted">{file.split('/').pop()}</Card.Subtitle>
                                                        <a href={file} target="_blank" rel="noreferrer">Descargar</a>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                )}

                                {selectedFiles.length !== 0 && selectedFiles[0].name ? (
                                    <div className="selected-file">
                                        {selectedFiles.length && selectedFiles.map((file, i) =>
                                        {
                                            return (
                                                <Card className="dropzone-file-card" key={i} onClick={(e) => (e.stopPropagation())}>
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {
                                                                !this.props.disabled && <div className='dropzone-file-remove'><i onClick={this.deleteFile.bind(this)} data-file={i} className="bi bi-x-circle-fill"></i></div>
                                                            }
                                                            <i className={"dropzone-file-icon bi bi-file-earmark"} />
                                                        </Card.Title>
                                                        <Card.Subtitle className="dropzone-file-name mb-2 text-muted">{file.name}</Card.Subtitle>
                                                        {
                                                            (progress[i] !== 100 && progress[i] !== -1) && (
                                                                <div className="progress mb-3">
                                                                    <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={progress[i]} aria-valuemin="0" aria-valuemax="100" style={{ width: progress[i] + '%' }}>
                                                                        {progress[i]}%
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            (progress[i] === -1) && (
                                                                <div className="progress mb-3">
                                                                    <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Error</span>
                                                                </div>
                                                            )
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    !prevFiles.length && 'Arrastra un archivo aquí'
                                )}
                            </div>
                        </section>
                    )}
                </Dropzone>
                {
                    this.state.ignoredFiles && this.state.ignoredFiles.length > 0 && <div>
                        <h6 className='mt-3'>Archivos ignorados</h6>
                        <ul>
                            {
                                this.state.ignoredFiles.map((file, i) =>
                                {
                                    return <li key={i}>
                                        <span><b>{file.file.name}</b></span>
                                        {
                                            file.errors.map((error, i) =>
                                            {
                                                console.log(error);
                                                if (error.message.includes('File type must be'))
                                                {
                                                    error.message = error.message.replace('File type must be', '')
                                                    error.message = error.message.replaceAll('/\w+/[-+.\w]+/g', '');
                                                    let ftypes = error.message.split(',');
                                                    error.message = "El archivo debe ser de tipo";
                                                    error.message = error.message.concat(ftypes.slice(0, -1).join(', ') + ' o ' + ftypes.slice(-1));
                                                }
                                                if (error.message.includes('File is larger than'))
                                                    error.message = 'El tamaño del archivo es superior a ' + this.props.maxSize + 'MB.';
                                                return <p className='mb-0 pb-0' key={i}>{error.message}</p>
                                            })
                                        }
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        );
    }
}
