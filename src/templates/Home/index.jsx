import { Component } from 'react';
import './styles.css';

import loadPosts from '../../utils/LoadPost';
import PostCard from '../../components/PostCard';
import Button from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 53,
  };

  async componentDidMount() {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className='container'>
      <div className='posts'>
        {posts.map(post => (
          <PostCard 
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          cover={post.cover}
          />
        ))}
      </div>
      <div className='button-container'>
        <Button
         text='load more posts' 
         onClick={this.loadMorePosts}
         disabled={noMorePosts}
         />
       </div>
      </section>
    );
  };
};

export default Home;