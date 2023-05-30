import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    const { createComment, removeComment } = useComments();
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
