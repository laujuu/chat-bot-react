import React from 'react';
import styles from './css/MainPage.module.css';

class MainPage extends React.Component {
  render() {
    return (
      <main>
        <div className={styles.container}>
          <div>
            <h1 className={styles.title}>LoanStar</h1>
            <h3>
              Shine Bright with LoanStar: Your Guide to Financial Freedom!
            </h3>
          </div>
        </div>
      </main>
    );
  }
}

export default MainPage;