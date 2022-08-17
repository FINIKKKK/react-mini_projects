import React from "react";
import debounce from "lodash.debounce";

import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({
  items,
  isLoaded,
  setSuccess,
  invites,
  onInviteUser,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [value, setValue] = React.useState('');

  const clickSetSuccess = () => {
    setSuccess(true);
  };

  const updateSearch = React.useCallback(
    debounce((value) => setSearchValue(value), 150)
  );
  const onChangeInput = (e) => {
    updateSearch(e.target.value);
    setValue(e.target.value)
  };

  console.log(searchValue);

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          onChange={onChangeInput}
          type="text"
          placeholder="Найти пользователя..."
          value={value}
        />
      </div>
      {!isLoaded ? (
        <div className="skeleton-list">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((item) => {
              const fullName = (
                item.first_name +
                " " +
                item.last_name
              ).toLowerCase();

              return (
                fullName.includes(searchValue.toLowerCase()) ||
                item.email.toLowerCase().includes(searchValue.toLowerCase())
              );
            })
            .map((obj) => (
              <User
                key={obj.id}
                {...obj}
                isInvited={invites.includes(obj.id)}
                invites={invites}
                onInviteUser={onInviteUser}
              />
            ))}
        </ul>
      )}
      {invites.length > 0 && (
        <button onClick={clickSetSuccess} className="send-invite-btn">
          Отправить приглашение
        </button>
      )}
    </>
  );
};
