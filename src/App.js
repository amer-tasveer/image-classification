import logo from './logo.svg';
import './App.css';
import React, {Component } from "react";
import Axios from 'axios'
class App extends Component{

  constructor(props){
    super(props);
    this.state={
      url:false ,
      file:false,
      prediction:'',
     }
  
  }
  handleChange(e) {

    this.setState({
      url: URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0],
    })

  }
 OnchangeUrl(e){
  this.setState({
    url: e.target.value
  })  
 }
  Submit = (e)=>{
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('file', this.state.file);
    console.log(form_data)
    let url = '/upload/';
    Axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          this.setState({
            prediction:res.data
          })
        })
        .catch(err => console.log(err))

 }
 SubmitUrl = (e)=>{
  e.preventDefault();
  let form_data = new FormData();
  form_data.append('file', this.state.url);
  console.log(form_data)
  let url = '/upload/post_url';
  Axios.post(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
      .then(res => {
        this.setState({
          prediction:res.data
        })
      })
      .catch(err => console.log(err))

}
 cancel =e=>{
  e.preventDefault();
  this.setState({
    file:false
  })
}
 renderview=()=>{
  if(this.state.file==false){
    return(
      <div className="select-img-div" >
             <label  className='upload-button' htmlFor="upload-button"><i  class="las la-upload"></i></label>
             <input id='upload-button'type="file" hidden onChange={(e)=>this.handleChange(e)} name="image"/>
      </div>
    )
  }
  else if(this.state.file!==''){
    return(
      <div className='image' >
             <div className='cancel-row'  >
             <div className='cancel-div' onClick={(e)=>this.cancel(e)} >
             <i class="las la-times"></i>
             </div>
             </div>            
             <img className='image' src={this.state.url} alt={''} />

      </div>
    )
  }
}

 render(){
  return (
    <div className="App">
<h1>Drop or click to Upload image</h1>
<text>This classifier is build on the Resnet-18 model and trained on the Cifar-10 Dataset.
  Try it out!
</text>

<text>  Try it out!
</text>
<button  onClick={(e)=>this.Submit(e)} class="submit-btn" >
  Submit
</button>
{this.renderview()}
<center><h2>This is a {this.state.prediction}</h2></center>

<br/>
<p>OR</p>




    <input  type="url" placeholder="Add Image URL here" onChange={(e)=>this.OnchangeUrl(e)} name="imgurls" />
    <button  onClick={(e)=>this.SubmitUrl(e)} class="submit-btn" >
  Submit
</button>
</div>

  );
 }

}

export default App;
