import './PostForm.css'

const PostForm = ({content, title, handleChange})=>{

  return(
    <div className='container'>
      <label role='labeltext' className='label'>Title</label>
        <input
          type='text'
          value={title}
          name='title'
          placeholder='Hello world'
          onChange={handleChange}
          className='input-field'></input>
      <label role='labeltext' className='label'>Content</label>
        <textarea
          cols='30'
          rows='10'
          name='content'
          value={content}
          onChange={handleChange}
          placeholder='Content here'
          className='input-field'></textarea>
    </div>
  )
}

export { PostForm }