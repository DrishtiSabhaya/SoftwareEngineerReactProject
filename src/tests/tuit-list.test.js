import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

// jest.mock('axios');

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
];

const MOCKED_TUITS = [
  {
    _id: '6201f769fa48a047ed68c742',
    tuit: 'This is a demo tuit1',
    postedBy: MOCKED_USERS[0]._id
  },
  {
    _id: '6201f769fa48a047ed68c743',
    tuit: 'This is a demo tuit2',
    postedBy: MOCKED_USERS[1]._id
  },
  {
    _id: '6201f769fa48a047ed68c744',
    tuit: 'This is a demo tuit3',
    postedBy: MOCKED_USERS[1]._id
  }
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/This is a demo tuit1/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/This is a demo tuit1/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
                              Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(/This is a demo tuit1/i);
  expect(linkElement).toBeInTheDocument();
  mock.mockRestore();
});
