import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

let filteredArticles;
let data;
let btnClass;
let targetBtn;

const Articles = () => {
  const [text, setText] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [articles, setArticles] = useState([]);
  const link = 'https://jsonmock.hackerrank.com/api/articles?page=';

  const apiCall = async (page, text) => {
    let url = link + page;
    let response = await fetch(url);
    data = await response.json();

    let pages = data.total_pages;

    setTotalPages(pages);
    filteredArticles = data.data.filter((item) => item.title);
    
    setArticles(filteredArticles);
  }

  useEffect(() => {
    apiCall(1);
  }, []);

  const handleClick = (e) => {
    targetBtn = e.target.innerHTML;
    btnClass = "page-button-" + targetBtn;
    apiCall(targetBtn, text);
  }

  const handleAddClick = () => {
    data.data.push({title: text, page: data.page});
    filteredArticles = data.data.filter((item) => item.title);
    setArticles(filteredArticles);
  }


    return (
      
      <React.Fragment>
        <div className="pagination">
          {Array(totalPages).fill().map((page, index) =>   {
            if(index === Number(targetBtn)-1) {
              return (
                <button className={btnClass} data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{index + 1}</button>
              )
            }
            else {
              return (
                <button className="page-button" data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{index + 1}</button>
              )
            }
          })
          }
        </div>
        
        <ul className="results">
          {articles.map((article, index) => {
            return (
              <li key={"title-" + index} data-testid="result-row">{article.title}</li>
          )
          })}
        </ul>
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
          <button className="add-button" data-testid="add-button" key="add-button" onClick={handleAddClick}>Add to list</button>
        </View>
      </React.Fragment>
    );
}

export default Articles;
