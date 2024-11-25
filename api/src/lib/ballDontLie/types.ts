export interface BallDontLieMetadata {
    next_cursor: number,
    per_page: number
}

export interface BallDontLieResponse {
    data: Array<object>,
    meta: BallDontLieMetadata
}