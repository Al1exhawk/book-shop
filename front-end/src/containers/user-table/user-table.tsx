import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GenericState, setNewUserPage } from 'store';
import { UserModel } from 'models';
import { userService } from 'services';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
} from '@material-ui/core';
import { PageButton, UserRow } from 'components';
import { UserFilterState } from 'store';
import { RouteComponentProps } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

interface PropsFromState {
    userFilter: UserFilterState;
}

interface PropsFromDispatch {
    onPageClick: typeof setNewUserPage;
}

type Props = PropsFromState & PropsFromDispatch & RouteComponentProps;

const UserTable: React.FC<Props> = props => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [pages, setPages] = useState([1]);

    const fetchUses = async () => {
        const pagingModel = await userService.getUsers(props.userFilter);
        const userArr: UserModel[] = pagingModel.content;
        const pagesNumber: number = pagingModel.pages;

        setUsers(userArr);
        const pageButtonsArr: number[] = [];
        for (let i: number = 0; i < pagesNumber; i++) {
            pageButtonsArr.push(i + 1);
        }
        setPages(pageButtonsArr);
    };

    useEffect(() => {
        fetchUses();
    }, [props.userFilter]);

    const onDeleteClick = (id: string) => {
        userService.deleteUser(id);
    };

    const onEditClick = (id: string) => {
        props.history.push(`/users/edit/${id}`);
    };

    const onAddClick = () => {
        props.history.push('/users/add');
    };

    return (
        <Grid
            item
            container
            direction='column'
            justify='center'
            alignContent='center'
        >
            <Grid item container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    UserName
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Email
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Status
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
                        {users.map((user: UserModel) => {
                            return (
                                <UserRow
                                    key={user.id}
                                    id={user.id}
                                    userName={user.userName}
                                    email={user.email}
                                    isConfirm={user.confirmPassword}
                                    role={user.role}
                                    onDeleteClick={onDeleteClick}
                                    onEditClick={onEditClick}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item container justify='center' wrap='wrap' direction='row'>
                {pages.map(page => {
                    return (
                        <PageButton
                            key={page}
                            onClick={props.onPageClick}
                            value={page}
                        />
                    );
                })}
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state: GenericState) => ({
    userFilter: state.userFilter,
});

const mapDispatchToProps = {
    onPageClick: setNewUserPage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserTable);
