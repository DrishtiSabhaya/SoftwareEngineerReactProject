import {act, create} from "react-test-renderer"
import MyLikes from "../components/profile/my-likes";

const likeTuitsJson = [
    {
        "_id":  "123",
        "tuit": "Alice's tuit"
    },
    {
        "_id":  "234",
        "tuit": "Bob's tuit"
    },
    {
        "_id":  "345",
        "tuit": "Charlie's tuit"
    }
]

test('like tuits render', () => {
    let likeTuitsRender = () => {
        act(() => {
            likeTuitsRender = create(
                <MyLikes
                    tuits={likeTuitsJson}/>
            )
        })
    }
    const root = likeTuitsRender.root
    const ttrTuits = root.findAllByProps({className: 'ttr-tuit'})
    expect(ttrTuits.length).toBe(tuitsJson.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        expect(ttrTuit.props.children).toBe(tuitsJson[ndx].tuit)
    })
})



