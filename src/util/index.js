export const URI = "http://localhost:3001"
// TODO: get actual URI of the server when in production

const TIMESTAMP = 'timestamp', VOTESCORE = 'voteScore', COMMENTCOUNT = 'commentCount'
export const sortingCriteria = [TIMESTAMP, VOTESCORE, COMMENTCOUNT]
export const defaultSortingCriteria = TIMESTAMP

const ASCENDING = 'ascending', DESCENDING = 'descending'
export const sortDirections = [ASCENDING, DESCENDING]
export const defaultSortDirection = DESCENDING

export function GetSortMethodByCriteria(criteria, direction = DESCENDING) {
    if (sortingCriteria.indexOf(criteria) === -1) {
        criteria = defaultSortingCriteria
    }
    if (sortDirections.indexOf(direction) === -1) {
        direction = defaultSortDirection
    }
    switch (criteria) {
        case VOTESCORE:
            return (
                direction === DESCENDING
                    ? sortByVoteScoreDescending
                    : sortByVoteScoreAscending
            )
        case COMMENTCOUNT:
            return (
                direction === DESCENDING
                    ? sortByCommentCountDescending
                    : sortByCommentCountAscending
            )
        case sortingCriteria[0]:
        default:
            return (
                direction === DESCENDING
                    ? sortByTimestampDescending
                    : sortByTimestampAscending
            )
    }
}

export function sortByTimestampAscending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.timestamp === undefined || a.timestamp === null)
            ? new Date(0)
            : a.timestamp
    const b_nonnull =
        (b === null || b === undefined || b.timestamp === undefined || b.timestamp === null)
            ? new Date(0)
            : b.timestamp
    return compare(a_nonnull, b_nonnull)
}

function compare(a, b) {
    return a > b ? 1 : (a === b ? 0 : -1)
}

export function sortByTimestampDescending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.timestamp === undefined || a.timestamp === null)
            ? new Date(0)
            : a.timestamp
    const b_nonnull =
        (b === null || b === undefined || b.timestamp === undefined || b.timestamp === null)
            ? new Date(0)
            : b.timestamp
    return a_nonnull < b_nonnull ? 1 : (a_nonnull === b_nonnull ? 0 : -1)
}

export function sortByVoteScoreAscending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.voteScore === undefined || a.voteScore === null)
            ? 0
            : a.voteScore
    const b_nonnull =
        (b === null || b === undefined || b.voteScore === undefined || b.voteScore === null)
            ? 0
            : b.voteScore
    return compare(a_nonnull, b_nonnull)
}

export function sortByVoteScoreDescending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.voteScore === undefined || a.voteScore === null)
            ? 0
            : a.voteScore
    const b_nonnull =
        (b === null || b === undefined || b.voteScore === undefined || b.voteScore === null)
            ? 0
            : b.voteScore
    return a_nonnull < b_nonnull ? 1 : (a_nonnull === b_nonnull ? 0 : -1)
}

export function sortByCommentCountAscending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.commentCount === undefined || a.commentCount === null)
            ? 0
            : a.commentCount
    const b_nonnull =
        (b === null || b === undefined || b.commentCount === undefined || b.commentCount === null)
            ? 0
            : b.commentCount
    return compare(a_nonnull, b_nonnull)
}

export function sortByCommentCountDescending(a, b) {
    const a_nonnull =
        (a === null || a === undefined || a.commentCount === undefined || a.commentCount === null)
            ? 0
            : a.commentCount
    const b_nonnull =
        (b === null || b === undefined || b.commentCount === undefined || b.commentCount === null)
            ? 0
            : b.commentCount
    return a_nonnull < b_nonnull ? 1 : (a_nonnull === b_nonnull ? 0 : -1)
}