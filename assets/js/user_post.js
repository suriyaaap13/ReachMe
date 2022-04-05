{  
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-btn', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    } 

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
                    <div class="post-card">
                        <div class="post-card-title">
                            <p>
                                ${post.user}
                            </p>
                            <p>
                                <a class="delete-post-btn" href="/posts/destroy/${ post._id }">
                                    X
                                </a>
                            </p>
                            
                        </div>
                        <div class="post-content">
                            ${ post.content }
                        </div>
                        <ul id="post-comment-${ post._id }">
                            
                        </ul>
                    
                        <form action="/comments/create" id="add-comment-form" method="post">
                            <input type="text" name="content" placeholder="Add a Comment..." required>
                            <input type="hidden" name="post" value=  ${post._id} >
                            <button type="submit" >Add</button>
                        </form> 
                        
                    </div>
                    
                
                </li>`);
    }



    // method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();

}
    
