import * as actions from './index'

describe('actions', ()=>{
  describe('retuns the correct action when', ()=>{
    it('singsup', ()=>{
      const username = 'Ana'
      const status = true
      const expectedActionUser = {type: actions.LOGIN, payload:'Ana'}
      const expectedActionStatus = {type: actions.LOGIN_STATUS, payload:true}

      expect(actions.login(username)).toEqual(expectedActionUser)
      expect(actions.loginStatus(status)).toEqual(expectedActionStatus)
    })

    it('creates a new post', ()=>{
      const post = {username: 'Ana', content: 'Lorem Ipsum', title: 'Title'}
      const expectedAction = {type: actions.POSTS_LIST, payload:{username: 'Ana', content: 'Lorem Ipsum', title: 'Title'}}

      expect(actions.setPostsList(post)).toEqual(expectedAction)
    })

    it('shows delete modal', ()=>{
      const status = true
      const expectedAction = {type: actions.SHOW_DELETE_MODAL, payload: true}

      expect(actions.showDeleteModal(status)).toEqual(expectedAction)
    })

    it('shows edit modal', ()=>{
      const status = true
      const expectedAction = {type: actions.SHOW_EDIT_MODAL, payload: true}

      expect(actions.showEditModal(status)).toEqual(expectedAction)
    })

    it('shows more posts', ()=>{
      const ofSetNumber = 10
      const expectedAction = {type: actions.SHOW_MORE_POSTS, payload: 10}

      expect(actions.showMorePosts(ofSetNumber)).toEqual(expectedAction)
    })
  })
})