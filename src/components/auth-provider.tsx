
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User, type AuthError } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { AuthContext } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createUser } from '@/lib/data';

const ADMIN_EMAIL = 'khanhnnvn@gmail.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(user?.email === ADMIN_EMAIL);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      
      // Save user to Firestore
      await createUser({
        uid: loggedInUser.uid,
        email: loggedInUser.email || '',
        displayName: loggedInUser.displayName || '',
        photoURL: loggedInUser.photoURL || '',
      });

      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng trở lại, ${loggedInUser.displayName}!`,
      });
    } catch (error) {
      const authError = error as AuthError;
      // Don't show an error toast if the user closes the sign-in popup.
      if (authError.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user.');
        return;
      }
      console.error("Lỗi đăng nhập:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể đăng nhập. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Đã đăng xuất",
        description: "Bạn đã đăng xuất thành công.",
      });
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể đăng xuất. Vui lòng thử lại.",
      });
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
