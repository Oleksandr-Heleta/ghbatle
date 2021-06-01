import React from 'react';

const RepoGrid = (props) =>
        <ul className='popular-list'>
            {props.repos.map((repo, index) => (
                    <li key={repo.id} className='popular-item'>
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    src={repo.owner.avatar_url}
                                    className='avatar'
                                    alt={"Avatar for " + repo.owner.login}
                                />
                            </li>
                            <li>
                                <a href={repo.html_url} target='_blank'>{repo.name}</a>
                            </li>
                            <li>
                                @{repo.owner.login}
                            </li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            )
            }
        </ul>

export default RepoGrid;
