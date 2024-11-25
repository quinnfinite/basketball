export interface BallDontLieMetadata {
    next_cursor: number,
    per_page: number
}

export interface BallDontLieResponse {
    data: Array<Object>,
    meta: BallDontLieMetadata
}