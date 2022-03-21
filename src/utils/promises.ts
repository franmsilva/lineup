import {
  AuthError as FirebaseAuthError,
  MultiFactorError,
} from 'firebase/auth';
import { FirestoreError } from 'firebase/firestore';

interface Ok<T> {
  readonly ok: true;
  readonly val: T;
}

interface Err<E> {
  readonly ok: false;
  readonly err: E;
}

type Result<T, E> = Ok<T> | Err<E>;

const createOk = <T>(val: T): Ok<T> => ({
  ok: true,
  val,
});

const createErr = <E>(err: E): Err<E> => ({
  ok: false,
  err,
});

export const isOk = <T, E>(val: Result<T, E>): val is Ok<T> => val.ok;

export const isErr = <T, E>(val: Result<T, E>): val is Err<E> =>
  val.ok === false;

interface FirebaseStandardError {
  code: string;
  message: string;
  name: string;
}

type TFirebaseError =
  | FirebaseAuthError
  | FirebaseStandardError
  | MultiFactorError
  | FirestoreError;

export const handleFirebasePromise = async <TData>(
  promise: Promise<TData>
): Promise<Result<TData, TFirebaseError>> => {
  return promise
    .then((data: TData) => createOk(data))
    .catch((error: TFirebaseError) => Promise.resolve(createErr(error)));
};
