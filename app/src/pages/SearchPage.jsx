import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

function SearchPage() {
  const [searchMessages, setSearchMesssages] = useState([]);

  const [searchReplies, setSearchReplies] = useState();
  const [searchString, setSearchString] = useState();
  const [searchUser, setSearchUser] = useState();

  const [stringResults, setStringResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  async function search() {
    var theFinalResults;
    await axios.get('http://localhost:81/searchMessage').then((response) => {
      const theResults = response.data.map((messages) => [
        messages.data,
        messages.username,
        messages.id,
        messages.upvotes,
        messages.downvotes,
        messages.channelname,
      ]);
      setSearchMesssages(theResults);
    });

    // await axios.get('http://localhost:81/searchReplies').then((response) => {
    //   const theResults = response.data.map((messages) => [
    //     messages.data,
    //     messages.username,
    //     messages.id,
    //     messages.upvotes,
    //     messages.downvotes,
    //     messages.channelname,
    //   ]);
    //   theFinalResults += theResults;
    // });

    // setSearchMesssages(theFinalResults);
    // alert(searchMessages);
  }

  search();

  async function searchByString() {
    await setSearchUser();
    await setSearchString(document.getElementById('stringToSearch').value);
  }

  async function searchByUser() {
    await setSearchString();
    await setSearchUser(document.getElementById('userToSearch').value);
  }

  return (
    <div>
      <h3>Search by String</h3>
      <form>
        <div>
          <input
            type="text"
            className=""
            id="stringToSearch"
            placeholder="Enter String"
          />
        </div>
      </form>
      <button onClick={searchByString}>Search</button>

      <h3>Search by Name</h3>
      <form>
        <div>
          <input
            type="text"
            className=""
            id="userToSearch"
            placeholder="Enter username"
          />
        </div>
      </form>
      <button onClick={searchByUser}>Search</button>

      {searchMessages
        .filter((item) => item[0].includes(searchString))
        .map((item) => (
          <div
            key={item}
            style={{
              width: '100%',
              backgroundColor: '#bd03',
              border: '#fff',
              borderRadius: '5px',
            }}
          >
            <div>
              <p>{item[1]} says</p>
              <p>
                <b>
                  {item[0]} ({item[5]})
                </b>
              </p>
              <button>👍 {item[3]}</button>
              <button>👎 {item[4]}</button>
            </div>
          </div>
        ))}

      {searchMessages
        .filter((item) => item[1] === searchUser)
        .map((item) => (
          <div
            key={item}
            style={{
              width: '100%',
              backgroundColor: '#bd03',
              border: '#fff',
              borderRadius: '5px',
            }}
          >
            <div>
              <p>{item[1]} says</p>
              <p>
                <b>
                  {item[0]} ({item[5]})
                </b>
              </p>
              <button>👍 {item[3]}</button>
              <button>👎 {item[4]}</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchPage;
