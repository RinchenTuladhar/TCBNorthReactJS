import React, { Component } from "react";
import "./Photos.scss";
import firebase from "../../config/Fire";

class Photos extends Component {
  constructor(props){
    super();

    this.state = {
      images: "",
      stored_images_url: []
    }

    this.getImage = this.getImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getImage();
  }

  getImage(){
    var list_of_urls = []
    var that = this;

    firebase.storage().ref('photos/').listAll().then(function(image){
      if(image.items.length > 0){
        image.items.forEach(function(image_url){
          image_url.getDownloadURL().then(function(url){
            that.setState({
              stored_images_url: [...that.state.stored_images_url, url]
            });
          })
        });
      }
    });
  }

  handleChange(e){
    console.log(e.target.files[0]);
    if(e.target.files[0]) {
      this.setState({
        images: e.target.files[0]
      });
    }
  }

  handleSubmit = (e) =>  {
    e.preventDefault();
    let bucketName = 'photos'
    let file = this.state.images;
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask = storageRef.put(file)
  }

  render(){
    const stored_images_url = this.state.stored_images_url;

      return (
        <div className="container squished">
          <h1>Add Photos</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Upload Image<br/>
              <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChange}/>
            </label><br/>
            <input type="submit" className="float-right" value="Add"/><br/><br/>
          </form>

          <div className="gallery">
          <br/><hr/>
          <h1>Gallery</h1>
            <ul>
            {stored_images_url.map(v => {
              return (
                <li><img src={v}/></li>
              );
            })}
            <li></li>
            </ul>
          </div>
        </div>
      )
  }
};

export default Photos;
