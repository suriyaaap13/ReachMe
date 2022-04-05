{  
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',//A string containing the URL to which the request is sent.
                // where does this data come from? It looks like a databade stored data but we didn't connect anything
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    new Noty({
                        theme: 'relax',
                        text: "Post Created",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1000
                    }).show();
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-btn', newPost));//I am not getting why we are writing this line. then I am not getting the way we are getting the class items
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
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'warning',
                        layout: 'topRight',
                        timeout: 1000
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // function to submit the form data for new comment using AJAX
    let createComment = function(){
        
        $('#add-comment-form').submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: commentForm.serialize(),
                success: function(data){
                    console.log("Hello World");
                    console.log(data);
                    newCommentDOM(data);
                },error: function(err){
                    console.log(err);
                }
            });
        });
    }

    // method to create comment in DOM
    let newCommentDOM = function(comment){
        console.log("HI");
        return $(`<li id="comment-${ comment._id }">
                    <div class="comment-card">
                        <div class="comment-title">
                            <p>
                                ${ comment.user }
                            </p>
                            <a href="/comments/destroy/${ comment._id }">
                                <p>X</p>
                            </a>
                        </div>
                        <div class="comment-content">
                            <p>
                            ${ comment.content }
                            </p>
                        </div>
                    </div> 
                </li>`);
    }
    
    let deleteComment = function(deleteLink){

    }


    createPost();

    createComment();

}
    
