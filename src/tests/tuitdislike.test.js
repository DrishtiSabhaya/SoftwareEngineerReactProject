import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly', () => {
    let stats = {
        likes: 123,
        dislikes: 124,
        replies: 234,
        retuits: 345
    }

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats = () => {
        act(() => {
            tuitStats = create(
                <TuitStats
                    dislikeTuit={dislikeTuit}
                    tuit={{stats : stats}}/>
            );
        })
    }

    const root = tuitStats.root;
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const dislikeTuitButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('123');

    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('123');
});