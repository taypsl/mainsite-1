import React from 'react';

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.myModal.style.display = 'block';
    this.modalImg.src = this.smallImg.src;
  }
  closeModal() {
    this.myModal.style.display = 'none';
  }

  render() {
    return (
      <div>
        <img
          ref={img => (this.smallImg = img)}
          onClick={this.openModal}
          id="myImg"
          src={this.props.src}
          alt={this.props.alt}
        />
        <div ref={mod => (this.myModal = mod)} className="modal-P">
          <span className="close-L" onClick={this.closeModal}>
            &times;
          </span>
          <img className="modal-content-Q" ref={img => (this.modalImg = img)} />
          <div ref={cap => (this.caption = cap)} id="caption">
            {this.props.alt}
          </div>
        </div>
      </div>
    );
  }
}
export default ImageViewer;
