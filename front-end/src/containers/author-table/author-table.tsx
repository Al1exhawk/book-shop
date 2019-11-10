import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { GenericState, setNewAuthorPage } from '../../store';
import { AuthorModel } from '../../models';
import { authorService } from '../../services';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from '@material-ui/core';
import { PageButton, AuthorRow } from '../../components';
import { AuthorFilterState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

interface PropsFromState {
    authorFilter: AuthorFilterState
}

interface PropsFromDispatch {
    onPageClick: typeof setNewAuthorPage
}

type Props = PropsFromState & PropsFromDispatch & RouteComponentProps;


const AuthorTable: React.FC<Props> = (props) => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [pagesB, setPages] = useState<number[]>([1]);

    const fetchAuthor = async () => {
        const pagingModel = await authorService.getAuthors(props.authorFilter);
        const pagesNumber = pagingModel.pages;
        const authorArray = pagingModel.content;

        setAuthors(authorArray);

        const pageButtonsArr: number[] = []
        for (let i: number = 0; i < pagesNumber; i++) {
            pageButtonsArr.push(i + 1);
        }
        setPages(pageButtonsArr);
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    const onAddClick = () => {
        props.history.push('/authors/add')
    }

    const onDelete = (id: string) => {
        authorService.deleteAuthor(id);
    }

    const onEdit = (id: string) => {
        props.history.push(`/authors/edit/${id}`)
    }

    return (
        <>
            <Grid item container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    First name
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Second name
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Books/Magazines
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Edit
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={onAddClick}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map(author => {
                            return <AuthorRow onDeleteClick={onDelete} onEditClick={onEdit} key={author.id} author={author} />
                        })}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item container justify='center' direction='row'>
                {pagesB.map((page) => {
                    return <PageButton key={page} onClick={props.onPageClick} value={page} />;
                })}
            </Grid>
        </>
    )
}

const mapStateToProps = (state: GenericState) => ({
    authorFilter: state.authorFilter
})

const mapDispatchToProps = {
    onPageClick: setNewAuthorPage
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorTable);