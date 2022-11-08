
export const fetchUserByParams = (): string => `
SELECT

ua.id,
ua.password,
ua.email,
ua.phone_number as "phoneNumber",
ua.fullname,
ua.reset_password as "resetPassword",
ua.expires_in as "expiresIn",
ua.is_root as "isRoot",
ua.is_active as "isActive",
ua.created_at as "createdAt",
p.profile_name as "profileName"

from user_account ua 
INNER JOIN user_profile up ON up.fk_user = ua.id
INNER JOIN profile p ON p.id = up.fk_profile
WHERE ua.id = :userId or ua.email = :email or ua.fullname = :fullname
`
