import {
    findAllTuits, findTuitById, findTuitByUser, createTuit, updateTuit, deleteTuit
} from "../services/tuits-service";

import {
    deleteUsersByUsername, createUser, findAllUsers
} from "../services/users-service";

const user = {
    username: 'name123',
    password: 'name123',
    email: 'name@name.com'
};

const tuit = {
    _id: '6201f769fa48a047ed68c741',
    tuit: 'A demo tuit',
    postedOn: '03/10/2022'
};

describe('can create tuit with REST API', () => {

    beforeAll(async () => {
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(user.username);
    })

    afterAll(async() => {
        await  deleteTuit(tuit._id);
        return await deleteUsersByUsername(user.username);
    })

    test('can insert new tuits with REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id, tuit);

        expect(newTuit.tuit).toEqual(newTuit.tuit);
    });

});

describe('can delete tuit wtih REST API', () => {

    beforeAll(async() => {
        await deleteTuit(tuit._id);
        await deleteUsersByUsername(user.username);
    })

    afterAll(() => {
        return deleteTuit(tuit._id);
        return deleteUsersByUsername(user.username);
    })

    test('can insert new tuits with REST API', async () => {
        const newUser = await createUser(user);
        await createTuit(newUser._id, tuit);
        const status = await deleteTuit(tuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {

    beforeAll(async() => {
        await deleteTuit(tuit._id);
        await deleteUsersByUsername(user.username);
    })

    afterAll(() => {
        return deleteTuit(tuit._id);
        return deleteUsersByUsername(user.username);
    })

    test('can retrieve a tuit by id with REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id, tuit);
        const getTuit = await findTuitById(newTuit._id);
        expect(newTuit.tuit).toEqual(getTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });

});

describe('can retrieve all tuits with REST API', () => {

    const tuitPosted = [
        {
            _id: '6201f769fa48a047ed68c742',
            tuit: 'This is a demo tuit',
            postedOn: '03/10/2022'
        },
        {
            _id: '6201f769fa48a047ed68c743',
            tuit: 'This is a demo tuit',
            postedOn: '03/11/2022'
        },
        {
            _id: '6201f769fa48a047ed68c744',
            tuit: 'This is a demo tuit',
            postedOn: '03/12/2022'
        }
    ];

    beforeAll(async () => {
        await Promise.all(tuitPosted.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(user.username);
    });

    afterAll(async () => {
        await Promise.all(tuitPosted.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(user.username);
    });

    test('can retrieve all tuits with REST API', async () => {
        const newUser = await createUser(user);
        await Promise.all(tuitPosted.map(async (tuit) => {
            return await createTuit(newUser._id, tuit);
        }));

        const getTuits = await findAllTuits();
        expect(getTuits.length).toBeGreaterThanOrEqual(tuitPosted.length);

        const tuitsWeInserted = getTuits.filter(
            tuit => tuit.postedBy._id === newUser._id);

        tuitsWeInserted.forEach(tuitInserted => {
            const tuit = tuitPosted.find(tuit => tuit._id === tuitInserted._id);
            expect(tuitInserted.tuit).toEqual(tuit.tuit);
            expect(tuitInserted.postedBy).toEqual(newUser._id);
        });
    });

});